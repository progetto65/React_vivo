const formData = function (dataArr, obj) {
    let code = 200;
    let msg = '成功';
   
  const data = dataArr.map((item) => {
      let items = {}
    for(const i in item) {
     for(const o in obj ) {
         if(i === o){
             items[o] = item[o]
         }
     }
    }
    return items
  });
//   if(data)
  return {code,data,msg}
};

module.exports = {
  formData,
};
