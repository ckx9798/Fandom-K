const GenderToggleButton = ({ value, currentGender, onChange, label }) => {
    const isActive = currentGender === value;

    return (
        <button
            value={value}
            onClick={onChange}
            className={`
        w-1/2 h-[42px] p-[12px]
        border-b ${isActive ? 'border-white' : 'border-none'}
        bg-white/10
        text-white
        transition-all duration-500 ease-out
        ${isActive ? '' : 'bg-inherit text-gray-300'}
        font-medium
      `}
            style={{
                animation: isActive ? 'move 2s ease-out' : undefined,
            }}
            disabled={isActive}
        >
            {label}
        </button>
    );
};

export default GenderToggleButton;
