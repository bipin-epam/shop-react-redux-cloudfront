import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios, { AxiosError } from "axios";
type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    // Get the presigned URL
    try {
      const {
        data: { data },
      } = await axios({
        method: "GET",
        url,
        params: {
          name: encodeURIComponent(file!.name),
        },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const result = await fetch(data, {
        method: "PUT",
        body: file,
      });
      // console.log(result);
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setFile(undefined);
    }
  };
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
