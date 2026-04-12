const mongoose = require('mongoose');

const dburl = 'mongodb://localhost:4885/StudyDB';

// Compass에 보이는 이름과 대소문자까지 동일해야 함 (예: Santa ≠ santa)
const COLLECTION_NAME = 'Santa';

const santaUserSchema = new mongoose.Schema(
  {
    userID: { type: Number },
    money: { type: Number },
    level: { type: Number },
  },
  { collection: COLLECTION_NAME }
);

const SantaUser = mongoose.model('SantaUser', santaUserSchema);

/** 앱 시작 시 한 번만 호출. 그 다음부터는 find* 만 쓰면 됨. */
async function init() {
  await mongoose.connect(dburl);
}

function findByUserID(userID) {
  return SantaUser.findOne({ userID }).lean();
}

function findAllByUserID(userID) {
  return SantaUser.find({ userID }).lean();
}

function findAll(limit = 100) {
  return SantaUser.find({}).limit(limit).lean();
}

function findByIdString(idString) {
  return SantaUser.findById(idString).lean();
}

/**
 * DB에서 lean()으로 가져온 문서 -> C# DTO에 맞는 평면 객체 (JSON으로 보낼 때 사용).
 * C# 예:
 *   public class SantaUser {
 *     public string Id { get; set; }
 *     public int UserID { get; set; }
 *     public int Money { get; set; }
 *     public int Level { get; set; }
 *   }
 */
function toCSharpSantaUser(doc) {
  if (doc == null || typeof doc !== 'object') {
    return null;
  }
  const id = doc._id;
  return {
    Id: id != null ? String(id) : null,
    UserID: doc.userID ?? 0,
    Money: doc.money ?? 0,
    Level: doc.level ?? 0,
  };
}

const testnumber = 10;

function getTestnumber() {
  return testnumber;
}

module.exports = {
  getTestnumber,
  init,
  findByUserID,
  findAllByUserID,
  findAll,
  findByIdString,
  toCSharpSantaUser,
  COLLECTION_NAME,
};
