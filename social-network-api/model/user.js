module.exports=(sequelize,Sequelize)=>{
    const Post = sequelize.define('post', {
        post_id:{
            type:Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            required:true
        },
        loc_name:{
            type: Sequelize.STRING(100),
            allowNull: false,
            required:true
        },
    
        loc_desc:{
            type: Sequelize.STRING, 
            allowNull: false,
            required: true
        },
        loc_img: {
            type: Sequelize.BLOB, 
            allowNull: true,
            required: false
        },
        votes:{
            type: Sequelize.STRING, 
            allowNull: true,
            required: false
        },
    
    
    
    });
    


 return Post;

}




