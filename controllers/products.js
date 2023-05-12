const Product = require('../models/product');

const getAllProductStatic =async  (req , res)=>{
    const product = await Product.find();
     res.status(200).json({product})
}

const getAllProduct =async (req , res)=>{
    const {featured , company , name , sort , fields , numricFilters} = req.query;
    const queryObject = {}
    if(featured){queryObject.featured=featured === 'true'?true:false}
    if(company){queryObject.company=company}
    if(name){queryObject.name={$regex:name , $options:'i'}}
    if(numricFilters){
        const operatorMap = {
            '>' : '$gt' ,
            '>=' : '$gte' ,
            '=' : '$eq' ,
            '<' : '$lt' ,
            '<=' : '$lte' ,
        }
        const regEx = /\b(<|>|=|<=|>=)\b/g
        let filter = numricFilters.replace(regEx ,
            (match)=>`_${operatorMap[match]}_`)
            console.log(filter);
    
        const Options = ['price' , 'rate'];
        filter = filter.split(',').forEach((item) => {
            const  [field , opreator , value] = item.split('_')
            if(Options.includes(field)){
              queryObject[field] = {[opreator] : Number(value)}
            }
        })
    }
    
    console.log(queryObject);
    let result = Product.find(queryObject);

if(sort){
    const sortList = sort.split(',').join(' ');
    result =result.sort(sortList);
}
else result = result.sort('creatAt')

if(fields){
        const fieldsList = fields.split(',').join(' ');
        result =result.select(fieldsList);
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1)*limit ;  
    // هون نحن عم نقسم الصفحات ف مثل(ا اذا حط ليميت 4 ف بروح هاد اللوجيك بجيب بالبيج الاول 4 و التاني بروح بيعمل سكيب ل اول اربعة و بجيب تاني أربعة و هيك ليزيد آخر شي  
    result = result.skip(skip).limit(limit);
    const product = await result

    res.status(200).json({product , num: product.length})}

module.exports = {
    getAllProduct ,
    getAllProductStatic
}