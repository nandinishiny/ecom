import React, { useState } from 'react'

const DummyData = () => {
    const [image,setImage] = useState('');
    function  handleimage(e) {
        let file = e.target.files[0];
    
        if (file) {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onloadend = () => {
           setImage(reader.result)
          }
          console.log(image)
        }
      }
  return (
    <div>
        <input type="file" onChange={handleimage} />
       {image&& <div><img src={image} alt="" /></div>}
       {console.log(image)}
    </div>
  )
}

export default DummyData