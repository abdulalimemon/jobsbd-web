"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "./button";
import {
  useGetAllResumeQuery,
  useUpdateResumeStatusMutation,
} from "@/redux/api/resume/resumeApi";
import { cn } from "@/lib/utils";
import { TResume } from "@/type";
import ORDivider from "./ORDivider";
import { useApplyJobMutation } from "@/redux/api/job/jobApi";
import Swal from "sweetalert2";
import ResumeUploader from "../candidate-dashboard/cv-manager/resume-uploader";

const ApplyJobModal = ({ jobId }: { jobId: string }) => {
  const [applyJob] = useApplyJobMutation();
  const [markAsDefault] = useUpdateResumeStatusMutation();
  const { data: resumes } = useGetAllResumeQuery("");
  const defaultResume = resumes?.data?.find(
    (resume: TResume) => resume.isDefault
  );
  const [open, setOpen] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleResumeChange = async (currentValue: string) => {
    const res = await markAsDefault(currentValue);
    console.log(res);
    if (res?.data) {
      setOpen(false);
    }
  };

  const handleApplyJob = async () => {
    const res = await applyJob(jobId);

    if (res?.data) {
      Swal.fire({
        title: "Success",
        text: "Job applied successfully",
        icon: "success",
      });
      setOpenModal(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog onOpenChange={setOpenModal} open={openModal}>
        <DialogTrigger>
          <button className="bg-green-500 text-white text-sm font-semibold rounded px-2 py-[5px]">
            Apply Now
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Apply for the job</DialogTitle>
          </DialogHeader>
          {/* popover content goes here */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="justify-between"
              >
                {defaultResume?.file_name || "upload Resume"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {resumes?.data?.map((resume: TResume) => (
                      <CommandItem
                        key={resume.id}
                        value={resume.id}
                        onSelect={(currentValue) =>
                          handleResumeChange(currentValue)
                        }
                      >
                        {resume.file_name}
                        <Check
                          className={cn(
                            "ml-auto",
                            resume?.isDefault ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {/* divider */}
          <ORDivider />
          {/* upload goes here */}
          <ResumeUploader />
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleApplyJob}
              className="bg-green-500 text-white text-sm font-semibold rounded hover:bg-green-500"
            >
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApplyJobModal;
