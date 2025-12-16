

export default function InputForm({label, id, name, type, placeholder, value, onChange, inputRef }, ref) {
    return (
        <div className={`flex flex-row gap-1 text-sm`}>
            <label
                htmlFor={id}
                className={`flex items-center bg-[var(--light-color)] max-w-fit min-w-25 text-[var(--background)] font-bold px-3 py-0.5 outline-2 outline-[var(--light-color)]`}>
                {label}
            </label>
            <input
                ref={inputRef || ref}
                id={id}
                name={name}
                type={type}
                min={0}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full px-3 py-1 outline-2 outline-[var(--light-color)]`}
                required />
        </div>
    )
}