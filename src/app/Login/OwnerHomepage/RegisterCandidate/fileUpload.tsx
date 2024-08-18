// import React, { useState, useEffect } from "react";

// interface FileUploadProps {
//   dataChanger: (data: string) => void;
//   name: string;
//   max_file_size_in_kb?: number;
//   allowed_extensions?: string[];
//   button_title?: string;
//   required?: boolean;
//   type?: "image" | "file";
//   prev_src?: string;
// }

// const FileUpload: React.FC<FileUploadProps> = (props) => {
//   useEffect(() => {
//     clearFileUpload();
//   }, []);

//   const [fileName, setFileName] = useState<string>("");
//   const [fileSize, setFileSize] = useState<string>("");
//   const [fileSizeKB, setFileSizeKB] = useState<number>(0);
//   const [fileType, setFileType] = useState<string>("");
//   const [src, setSrc] = useState<string>("");

//   const clearFileUpload = () => {
//     setFileName("");
//     setFileSize("");
//     setFileType("");
//     setSrc("");
//     props.dataChanger("");
//   };

//   const onPickFile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     e.preventDefault();
//     clearFileUpload();
//     const inputElement = document.getElementById(
//       props?.name
//     ) as HTMLInputElement;
//     if (inputElement) {
//       inputElement.click();
//     }
//   };

//   const onFilePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files && files.length > 0) {
//       const file = files[0];
//       const file_name = file.name;
//       const file_size = getFileSize(file.size);
//       const file_size_kb = getFileSizeKB(file.size);
//       const file_type = getFileType(file).toLowerCase();

//       setFileName(file_name);
//       setFileSize(file_size);
//       setFileSizeKB(file_size_kb);
//       setFileType(file_type);

//       if (
//         props?.max_file_size_in_kb &&
//         file_size_kb > props?.max_file_size_in_kb
//       ) {
//         alert(
//           "Maximum allowed file size = " + props?.max_file_size_in_kb + " kb"
//         );
//         clearFileUpload();
//         return;
//       }

//       if (
//         props?.allowed_extensions &&
//         !arrToLowerCase(props?.allowed_extensions).includes(file_type)
//       ) {
//         clearFileUpload();
//         alert("Allowed file type = " + props?.allowed_extensions.join(", "));
//         return;
//       }

//       const fileReader = new FileReader();
//       fileReader.addEventListener("load", () => {
//         props.dataChanger(fileReader.result as string);
//         setSrc(fileReader.result as string);
//       });
//       fileReader.readAsDataURL(file);
//     }
//   };

//   const getFileSize = (file_size: number): string => {
//     if (file_size / 1024 >= 1024) {
//       return parseInt((file_size / 1024 / 1024).toFixed(0)) + " MB";
//     } else {
//       return parseInt((file_size / 1024).toFixed(0)) + " KB";
//     }
//   };

//   const getFileSizeKB = (file_size: number): number => {
//     return parseInt((file_size / 1024).toFixed(0));
//   };

//   const getFileType = (file: File): string => {
//     return file?.type.split("/").pop() || "";
//   };

//   const arrToLowerCase = (arr: string[] = []): string[] => {
//     return arr.map((str) => str.toLowerCase());
//   };

//   return (
//     <>
//       <button
//         className="btn btn-primary text-capitalize mr-2 mb-2"
//         onClick={(e) => onPickFile(e)}
//       >
//         {props?.button_title || "Upload File"}
//       </button>

//       {props?.required && fileName?.length <= 3 && !src ? (
//         <label className="label label-danger">Required</label>
//       ) : null}

//       <br />

//       {fileName ? (
//         <label className="label label-primary">{fileName}</label>
//       ) : null}
//       {fileSize ? <label className="label label-info">{fileSize}</label> : null}

//       <br />

//       {props?.type === "image" && src ? (
//         // eslint-disable-next-line @next/next/no-img-element
//         <img
//           src={src}
//           style={{ maxHeight: "150px", maxWidth: "150px" }}
//           alt=""
//           className="mt-2"
//         />
//       ) : null}

//       {props?.type === "image" && props?.prev_src && !src ? (
//         // eslint-disable-next-line @next/next/no-img-element
//         <img
//           src={props?.prev_src}
//           style={{ maxHeight: "150px", maxWidth: "150px" }}
//           alt=""
//           className="mt-2"
//         />
//       ) : null}

//       {props?.type === "image" && src ? (
//         <button
//           className="btn btn-danger  btn-outline-danger pl-1 pr-0 py-0 ml-2"
//           onClick={clearFileUpload}
//           title="Remove file"
//         >
//           <i className="icofont icofont-ui-close"></i>
//         </button>
//       ) : null}

//       <input
//         className="file d-none"
//         type="file"
//         data-show-upload="true"
//         data-show-caption="true"
//         id={props?.name}
//         name={props?.name}
//         required={props?.required ? true : false}
//         onChange={(e) => onFilePicked(e)}
//       />
//     </>
//   );
// };

// export default FileUpload;
