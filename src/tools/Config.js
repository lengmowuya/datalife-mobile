export default {
    getIp(){
        console.log(process.env.NODE_ENV);
        if(process.env.NODE_ENV === 'production'){
            return 'http://101.35.144.20:3000'
        }else{
            return 'http://192.168.1.9:3000'
        }
    }
    // GetUserId(){

    // }
}