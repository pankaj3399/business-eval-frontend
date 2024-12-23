// import React from "react";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useBusinessStore from "../store/buisnessSrore";
import { toast } from "react-toastify";

interface FilesProps {
  data: any;
  close: () => void;
}



const EditModal = ({ close, data }: FilesProps) => {
  const [name, setName] = useState(data?.business_name);
  const [link, setLink] = useState(data?.business_url);
  const [location, setLocation] = useState(data?.business_location);
  const [description, setDescription] = useState(data?.business_notes);
  const { updateBusiness } = useBusinessStore();

  useEffect(() => {
    setName(data?.business_name);
    setLink(data?.business_url);
    setLocation(data?.business_location);
    setDescription(data?.business_notes);
  }, [data]);

  const handleSave = async () => {
    console.log(name, link, location, description);
    await updateBusiness(data?._id, {
      business_name: name,
      business_url: link,
      business_location: location,
      business_notes: description,
    });
    toast.success("Business updated successfully");
    window.location.reload();
    close();
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto ">
        <div className="flex justify-between items-center border-b px-4 py-3">
          <h2 className="text-lg font-semibold text-gray-800"> Edit Business</h2>
          <button
            onClick={close}
            aria-label="Close modal"
            className="text-gray-500 hover:text-gray-800"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4 space-y-3">
                <div className="flex flex-col gap-2">
                    <Label>Name</Label>
                    <Input
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     placeholder="Name"
                     className="w-full mb-4"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Location</Label>
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Location"
                      className="w-full mb-4"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Link</Label>
                    <Input
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Link"
                    className="w-full mb-4"
                  />
                </div>
                <div className="flex flex-col gap-2">
                        <Label>Description</Label>
                    <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="w-full mb-4"
                  />
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={handleSave}>Save</Button>
            </div>
        </div>
       
      </div>
    </div>
  );
};

export default EditModal;