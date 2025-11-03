

export default function InputForm({position, rounded, labelW, label, id, name, type, placeholder, value, onChange, inputRef }, ref) {

    const pos = {
        flex: "flex-row",
    }[position] || "flex-col";
    
    const roundedStyle = {
        none: " ",
    }[rounded] || "full";

    const labelWidth ={
        fit: "fit",
        small: "30",
        medium: "40"
    }[labelW] || "full";

    return (
        <div className={`flex ${pos} gap-1 text-sm`}>
            <label
                htmlFor={id}
                className={`bg-[var(--light-color)] w-${labelWidth} text-[var(--background)] font-bold px-3 py-0.5 outline-2 outline-[var(--light-color)] rounded-br-${roundedStyle}`}>
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
                className={`w-full px-3 py-0.5 outline-2 outline-[var(--light-color)] rounded-tr-${roundedStyle}`}
                required />
        </div>
    )
}