import { HttpStatus, Res, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { PhotosService } from './photos.service';
import { PhotoType, UserUploadProfilePicType} from './photo.dto';
import { CreatePhotoInput, UpdatePhotoInput, UploadUserProfilePicInput} from './photo.input';
import { GraphqlAuthGuard } from '../auth/GraphqlAuthGuard ';

@Resolver()
export class PhotosResolver {

    constructor(private photosService: PhotosService){

    }

    @Query(() => [PhotoType],{ name: 'findAllPhotos' })
    @UseGuards(GraphqlAuthGuard)
    async findAll() {
        return this.photosService.findAll();
    }

    @Query(() => PhotoType,{ name: 'findOnePhoto' })
    @UseGuards(GraphqlAuthGuard)
    async findOne(@Args('id', { type: () => Int }) id: string){
        return this.photosService.findOne(id);
    }

    @Mutation(() => PhotoType,{ name: 'createPhoto' })
    @UseGuards(GraphqlAuthGuard)
    async create(@Args('input') input: CreatePhotoInput ) {
        return this.photosService.create(input);
    }

    @Mutation(returns => PhotoType,{ name: 'updatePhoto' })
    @UseGuards(GraphqlAuthGuard)
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
    async delete(@Args('id') id: number) {
        const result = await this.photosService.delete(id).then(result=>{
            if (result) {
                return 'Ok';
            }
            return 'error';
        }).catch(error=> {return error});
    }

    @Mutation(returns => UserUploadProfilePicType)
    @UseGuards(GraphqlAuthGuard)
    async uploadProfilePic(@Args('UploadUserProfilePicInput') {file} : UploadUserProfilePicInput){
        const fileData = await file;
        ///Do something with the fileData
    }

}
