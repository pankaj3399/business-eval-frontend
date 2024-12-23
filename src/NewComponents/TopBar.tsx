import React from "react";
import { ArrowLeft, FileText, Loader2, PencilIcon, Upload, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'react-toastify';
import useBusinessStore from "../store/buisnessSrore";
import FilesModal from "./FilesModal";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import EditModal from "./EditModal";

function shortenURL(url: string, maxLength = 20): string {
  return url.length > maxLength ? `${url.slice(0, maxLength)}...` : url;
}

export default function TopBar({ data }: { data: any, state: any }) {
  const { fetchBusiness, uploadFile, updateBusiness } = useBusinessStore();
  const [isUploading, setIsUploading] = React.useState(false);
  const [showFilesModal, setShowFilesModal] = React.useState(false);
  const [showNotesModal, setShowNotesModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [notes, setNotes] = React.useState("");
  const [files, setFiles] = React.useState([]);
  const navigate = useNavigate();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (data) {
      setNotes(data.business_notes);
      setFiles(data.business_attachments);
    }
    if(localStorage.getItem('business')){
      const business = JSON.parse(localStorage.getItem('business') || '');
      setNotes(business.business_notes);
      setFiles(business.business_attachments);
    }
  }, [data]);

  const handleSaveChanges = () => {
    if (localStorage.getItem('user_id') === null) {
      const business_payload = localStorage.getItem('business');
      if (!business_payload) return;
      const business = JSON.parse(business_payload || '');
      business.business_notes = notes;
      localStorage.setItem('business', JSON.stringify(business));
      setShowNotesModal(false);
    } else {
      updateBusiness(data?._id, { business_notes: notes });
    }
    setShowNotesModal(false);
  };

  const handleUploadClick = () => {
    if (!localStorage.getItem('token')) {
      toast.warn("Please login to upload.");
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const response = await uploadFile(data?._id, file);
        console.log("file response" + JSON.stringify(response));
        toast.success("File uploaded successfully!");
        await fetchBusiness(data?._id);
        window.location.reload();
      } catch (error) {
        toast.error("Failed to upload file. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleDeleteFile = async (fileUrl: string) => {
    setFiles(files.filter((file: any) => file.url !== fileUrl));
    await updateBusiness(data?._id, { business_attachments: files.filter((file: any) => file.url !== fileUrl) });
    window.location.reload();
  }

  const isTokenAvailable = Boolean(localStorage.getItem('token'));

  return (
    <div className="bg-transparent">
      {/* <ToastContainer /> */}
      <header className="top-0 z-50 flex h-10 items-center justify-between mb-3 px-4">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mt-2 text-blue-500" />
          <span className="sr-only">Go back</span>
        </Button>
        <h1 className="text-base font-normal flex-1 text-center mt-2 text-blue-600">{data?.business_name}</h1>
      </header>
      <div className="w-full border border-solid bg-white h-0.5"></div>
      <main className="m-1">
        <Card className=" mx-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-3 w-full">
                <div className="flex justify-between w-full">
                  <CardTitle>{data?.business_name}</CardTitle>
                  <Button variant="ghost" size="icon" className="px-2 w-auto h-8" onClick={() => {
                    if (!isTokenAvailable) {
                      toast.warn("Please save before editing.");
                    }else{
                      setShowEditModal(true);
                    }
                  }}>
                    {/* <p className="text-sm text-gray-500">Edit Data</p> */}
                    <PencilIcon className="h-2 w-2" />
                  </Button>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{data?.business_location}</p>
            <div className="flex items-center gap-2">
              <a href={(data?.business_url.startsWith("https://") ? data?.business_url : "https://" + data?.business_url) || ""} target="blank" className="text-sm text-blue-600 hover:underline">
                {shortenURL(data?.business_url || "")}
              </a>

              
              
            </div>
            
            <div>
            {notes ? (
              <div className="flex gap-2 items-center">
                <p className="text-sm text-gray-500 w-full ">Description: {notes}</p>
                {/* <Button variant="ghost" onClick={() => setShowNotesModal(true)}><PencilIcon className="h-4 w-4" /></Button> */}
              </div>
            ) : (
              <Button className="bg-transparent text-black hover:bg-transparent shadow-none" onClick={() => setShowNotesModal(true)}>
                Add Description </Button>
            )}
            </div>
            <div className="py-3 flex flex-wrap gap-2"> 
            {isUploading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Button
                  // disabled={!isTokenAvailable}
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 p-0"
                  onClick={() => {
                    if (!isTokenAvailable) {
                      toast.warn("Please login to upload.");
                    }else{
                    handleUploadClick();
                  }}}
                >
                  <Upload className="h-10 w-10 text-blue-600" />
                  <span className="sr-only">Upload image</span>
                </Button>
              )}
              {files?.length > 0 && files.map((file: any, index: any) => (
              <div className="flex items-center gap-2">
              <a
                key={index}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition text-xs"
              >
                <FileText className="h-3 w-3 text-gray-500" />
                <span>{`${shortenURL(file.name)}`}</span>
              </a>
                <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={(e) => {
                  e.stopPropagation();
                  if (!isTokenAvailable) {
                    toast.warn("Please login to delete.");
                  }else{
                  handleDeleteFile(file.url);
                }}}>
                  <X className="h-4 w-4 text-red-600" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            ))}
           
            </div>
            {showNotesModal && (
              <div className="fixed inset-0 -top-5 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg w-96 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Add Description</h2>
                    <Button variant="ghost" onClick={() => setShowNotesModal(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <Input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add note here..."
                    className="w-full mb-4"
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={handleSaveChanges}>Save</Button>
                    <Button variant="ghost" onClick={() => setShowNotesModal(false)}>Cancel</Button>
                  </div>
                </div>
              </div>
            )}
             
          </CardHeader>
        </Card>
      </main>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="*"
        style={{ display: "none" }}
      />
      {showFilesModal && <FilesModal files={data?.business_attachments} close={() => setShowFilesModal(false)} state={data} />}
      {showEditModal && <EditModal close={() => setShowEditModal(false)} data={data} />}
    </div>
  );
}