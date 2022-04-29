import { HttpStatus, Res, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { PhotosService } from './photos.service';
import { PhotoType, UserUploadProfilePicType} from './photo.dto';
import { CreatePhotoInput, UpdatePhotoInput} from './photo.input';
import { GraphqlAuthGuard } from '../auth/GraphqlAuthGuard ';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { ViewAuthFilter } from '../auth/view.auth.filter';

@Resolver()
export class PhotosResolver {

    constructor(private photosService: PhotosService){

    }

    @Query(() => [PhotoType],{ name: 'findAllPhotos' })
    @UseGuards(GraphqlAuthGuard)
    @UseFilters(ViewAuthFilter)
    async findAll() {
        return this.photosService.findAll();
    }

    @Query(() => PhotoType,{ name: 'findOnePhoto' })
    @UseGuards(GraphqlAuthGuard)
    @UseFilters(ViewAuthFilter)
    async findOne(@Args('id', { type: () => Int }) id: string){
        return this.photosService.findOne(id);
    }

    @Mutation(() => PhotoType,{ name: 'createPhoto' })
    @UseGuards(GraphqlAuthGuard)
    @UseFilters(ViewAuthFilter)
    async create(@Args('input') input: CreatePhotoInput ) {
        return this.photosService.create(input);
    }

    @Mutation(returns => PhotoType,{ name: 'updatePhoto' })
    @UseGuards(GraphqlAuthGuard)
    @UseFilters(ViewAuthFilter)
    async update(@Args('id') id: number, @Args('input') input:  UpdatePhotoInput ) {
        return await this.photosService.update(id, input).then(result=>{
            if (result) {
                return result;
            }
            return null;
        }).catch(error=> {return error});
    }

    @Mutation(returns => String,{ name: 'deletePhoto' })
    @UseGuards(GraphqlAuthGuard)
    @UseFilters(ViewAuthFilter)
    async delete(@Args('id') id: number) {
        const result = await this.photosService.delete(id).then(result=>{
            if (result) {
                return 'Ok';
            }
            return 'error';
        }).catch(error=> {return error});
    }

    // @Mutation(returns => UserUploadProfilePicType)
    // @UseGuards(GraphqlAuthGuard)
    // async uploadProfilePic(@Args('UploadUserProfilePicInput') {file} : UploadUserProfilePicInput){
    //     const fileData = await file;
    //     ///Do something with the fileData
    // }

    @Mutation(() => Boolean)
    async uploadFile(@Args({name: 'file', type: () => GraphQLUpload})
    {
        createReadStream,
        filename
    }: FileUpload): Promise<boolean> {
        return new Promise(async (resolve, reject) => 
            createReadStream()
                .pipe(createWriteStream(`./static/images/${filename}`))
                .on('finish', () => resolve(true))
                .on('error', () => reject(false))
        );
    }

}
