import mongoose from 'mongoose';

const uri = "mongodb+srv://doanvvantrong:sieucap123@twitter.hmuyl.mongodb.net/tomosia_training?retryWrites=true&w=majority&appName=tomosia_training";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Kết nối MongoDB thành công!");
  })
  .catch((err) => {
    console.error("Kết nối MongoDB thất bại: ", err);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', userSchema);

const newUser = new User({
  name: 'John Doe',
  email: 'johndoe@example.com'
});

newUser.save()
  .then(() => {
    console.log("Dữ liệu đã được lưu vào MongoDB!");
  })
  .catch((err) => {
    console.error("Lỗi khi lưu dữ liệu: ", err);
  });
