const cloudinary = require('../config/cloudinary');

exports.getAuthenticatedImages = async (req, res) => {
  try {
    const resources = await cloudinary.api.resources({
      type: 'authenticated',
      prefix: 'team/', 
    });
    const imageUrls = resources.resources.map(resource =>
      cloudinary.url(resource.public_id, { sign_url: true, type: 'authenticated' })
    );
    res.json(imageUrls);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};
