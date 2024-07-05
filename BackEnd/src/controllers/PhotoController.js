import multer from 'multer';
import multerConfig from '../config/multer';
import Photo from '../models/Photo';

const upload = multer(multerConfig).single('photo');
//Adicionar funcionalidade para checar se o aluno existe
class PhotoController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if(err) return res.status(400).json({ error: err.code });

      try {

        const { originalname, filename } = req.file;
        const { student_id } = req.body;
        const photo = await Photo.create({ originalname, filename, student_id });

        return res.status(200).json({
          message: 'File updloaded',
          url: photo.url,
        });
      }catch(err) {
        console.log('Error no upload de arquivo');
        return res.status(400).json({ error: 'Invalid id of student' });
      }
    });
  }
}

export default new PhotoController();
