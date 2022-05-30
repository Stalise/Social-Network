require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
   // cloud_name: 'daggdfi3i',
   // api_key: '825276214257427',
   // api_secret: 'TQOgaGmvDOyM3jUzYWH9kda5znE'
});

module.exports = { cloudinary };