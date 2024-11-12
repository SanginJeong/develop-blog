const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017/blog";
const client = new MongoClient(uri);
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function run() {
  try {
    await client.connect();  // MongoDB에 연결

    const database = client.db('blog');  // 데이터베이스 이름 일치
    const userCollection = database.collection('users');  // 컬렉션 참조
    
    const password = 'wjdtkddls1!';
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password,salt);

    const result = await userCollection.insertOne({
      email: 'vheh7570',  // _id로 저장하려면 필드명을 _id로 지정
      password: hash
    });

    console.log("데이터 추가 성공:", result);
  } catch (error) {
    console.error("데이터 추가 실패:", error);
  } finally {
    await client.close();  // 연결 종료
  }
}

run().catch(console.dir);