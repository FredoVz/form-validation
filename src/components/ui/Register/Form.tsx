import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Form = ({
  schema,
  onSubmit,
  fields,
  defaultValues,
  isLoading,
}: {
  schema: any;
  onSubmit: (data: any) => void;
  fields: { name: string; label: string; type?: string; placeholder?: string }[];
  isLoading?: boolean;
  defaultValues?: any;
}) => {
  //watch = Untuk melihat perubahan pada inputan mirip useState //watch
  //handleSubmit = Mengambil nilai dari inputan pada saat submit
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {fields.map((item: any) => (
        <div>
          <label htmlFor={item.name} className="text-sm font-medium text-gray-600">
            {item.label}
          </label>
          <input
            {...register(item.name)}
            type={item.type || "text"}
            id={item.name}
            placeholder={item.placeholder || ""}
            autoComplete="off"
            className={`mt-2 w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 ${errors[item.name] && "border-2 border-red-600"}`}
            aria-invalid={errors[item.name] ? "true" : "false"}
          />
          {errors[item.name] && <small className="text-red-600">{`${errors[item.name]?.message}`}</small>}
        </div>
      ))}
      <button type="submit" className="w-full px-4 py-2 mt-4 font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-500 disabled:opacity-50" disabled={isLoading}>
        {isLoading ? "Loading..." : "Login"}
      </button>
    </form>
  );
};

export default Form;
