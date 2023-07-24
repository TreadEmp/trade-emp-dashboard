import * as React from "react";

export default function EmptyContent({ text }) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center block">
        <img
          className="mt-4 w-72 h-72 object-center object-fit"
          src={"/assets/img/empty-letter-box-vector.png"}
          alt="..."
        />
      </div>
      <label className="flex justify-center block uppercase text-slate-600 text-xs font-bold my-2">
        {text}
      </label>
    </div>
  );
}
