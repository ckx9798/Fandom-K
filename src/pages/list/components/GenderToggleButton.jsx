const GenderToggleButton = ({ value, currentGender, onChange, label }) => {
    return (
        <button value={value} onClick={(e) => onChange(e)} className={`${currentGender !== value ? 'inactive' : ''}`}>
            {label}
        </button>
    );
};

export default GenderToggleButton;
