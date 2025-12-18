import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  hidden?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  hidden,
  inputProps,
}: InputFieldProps) => {
  return (
    <div className={hidden ? "hidden" : "flex flex-col gap-2 w-full md:w-1/4"}>
      <label className="text-xs text-gray-600 font-semibold uppercase tracking-wide">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="ring-1 ring-gray-200 p-3 rounded-xl text-sm w-full bg-white/80 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-lamaSky focus:bg-white transition-all duration-300 outline-none shadow-sm hover:ring-gray-300 hover:shadow-md"
        {...inputProps}
        defaultValue={defaultValue}
      />
      {error?.message && (
        <p className="text-xs text-red-500 font-medium flex items-center gap-1">
          <span>⚠</span> {error.message.toString()}
        </p>
      )}
    </div>
  );
};

export default InputField;
