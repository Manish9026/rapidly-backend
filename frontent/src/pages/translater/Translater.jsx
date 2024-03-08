import axios from 'axios';
import React, { useEffect } from 'react'
axios.defaults.withCredentials=true

const Translater = () => {
  


    // const translater=async()=>{
    //     const params =new URLSearchParams();
    //     params.append('q',"hello");
    //     params.append('source','en');
    //     params.append('target','hi');
    //     params.append('api_key','xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
      
    //     axios.post('https://libretranslate.de/translate',params,{headers:{"accept":"application/json","Content-Type":"application/x-www-form-urlencoded",}
      
    //     }).then(res=>{
    //       console.log(res.data)
    //     })
    //   }
    useEffect(()=>{
//   translater()
    },[])
  return (
    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, reprehenderit ipsam placeat quibusdam maiores, accusamus delectus libero quidem laboriosam fuga possimus, adipisci distinctio dicta! Natus voluptas non illum porro aliquam, expedita repudiandae iure adipisci laborum sunt! Nihil exercitationem qui totam.</div>
  )
}

export default Translater