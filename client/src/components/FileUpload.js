import React, { Fragment, useState } from "react";
import axios from "axios";
import Message from "./Message";
import Progress from "./Progress";


const FileUpload = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("select file");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total
          )))
           // clear percentage
        setTimeout(() => setUploadPercentage(0), 10000);
        }
       
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('file uploaded succesfully');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("seems to be an error from the server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="d-flex flex-column">
          <div className="custom-file p-3 mb-4 justify-content-between d-flex bg-light cursor-pointer text-dark border border-primary">
            <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
            <label className="custom-file-label " htmlFor="customFile">
              {filename}
            </label>
          </div>
        </div>
        
        <div>
        <Progress percentage={uploadPercentage}/>
        </div>

        <div className="d-flex flex-column">
          <input type="submit" value="Upload" className="btn btn-primary btn-block cursor-pointer" />
        </div>
      </form>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center"> {uploadedFile.fileName} </h3>
            <img style={{ width: "100%" }} src={uploadedFile.filePath} alt="" />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;
