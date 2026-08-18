"use client";

interface IProps {
  isOpen: boolean;
  useDefaultWidth?: boolean;
  // onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, useDefaultWidth, children }: IProps) {
  return (
    <>
      {/*<button
        className="btn"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        open modal
      </button>*/}
      <dialog id="my_modal_2" className={`modal duration-300 ${isOpen ? "modal-open" : ""}`}>
        <div
          className={`max-h-[85vh] p-5 overflow-y-auto bg-white text-black rounded-[50px] w-full ${!useDefaultWidth ? " md:w-[40%]" : "md:w-[30%]"}`}
        >
          {children}
        </div>

      </dialog>
    </>
  );
}
