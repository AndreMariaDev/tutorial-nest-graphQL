// export const imageFileFilter = (req, file, callback) => {
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//       return callback(new Error('Only image files are allowed!'), false);
//     }
//     callback(null, true);
// };

// export const editFileName = (req, file, callback) => {
//     const name = file.originalname.split('.')[0];
//     const fileExtName = extname(file.originalname);
//     const randomName = Array(4)
//       .fill(null)
//       .map(() => Math.round(Math.random() * 16).toString(16))
//       .join('');
//     callback(null, `${name}-${randomName}${fileExtName}`);
//   };

// export class UploadService {
//     const storage = multer.diskStorage({
//         destination: function (req, file, callback) {
//             var dir = './uploads';
//             if (!fs.existsSync(dir)){
//                 fs.mkdirSync(dir);
//             }
//             callback(null, dir);
//         },
//         filename: function (req, file, callback) {
//             callback(null, file.originalname);
//         }
//     });
//   }