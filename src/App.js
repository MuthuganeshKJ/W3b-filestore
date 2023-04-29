import { ConnectWallet, useStorage } from "@thirdweb-dev/react";
import "./styles/Home.css";
import { useCallback, useState } from "react";
import {useDropzone} from 'react-dropzone'
import { useStorageUpload, MediaRenderer } from "@thirdweb-dev/react";
import Header from "./components/Header";
import About from "./components/About";
export default function Home() {
  const [uris, setUris] = useState([])
  const {mutateAsync: upload} = useStorageUpload();

  const onDrop = useCallback(
    async(acceptedFiles)=>{
     
      setUris([...await upload({data: acceptedFiles}), ...uris]);
      console.log(await upload({data: acceptedFiles}))
      
    },
    [upload]
  );
  const {getRootProps, getInputProps} = useDropzone({onDrop});
  console.log(uris)
  return (
    <div className="container">
      <Header/>
      <About/>
      <div {...getRootProps()}>
        <input {...getInputProps()}/>
        <button>Drop files here to upload on IPFS</button>
      </div>
      <h1>GALLERY</h1>
      <div className="Gallery">
        
      {uris.map((uri) => {
        return(
          <div className="Image">
          <MediaRenderer key={uri} src={uri} alt = "Image"  />
          <h6>{uri}</h6>
          </div>
        )
      })}
      </div>
      
    </div>
  );
}
