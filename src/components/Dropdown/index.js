import { Field } from "formik";
import React from "react";

const Dropdown = ({ name, placeholder, data }) => {
    return (
        <Field
            as="select"
            name={name}
            className="px-5 py-3 mt-4 rounded-lg bg-slate-100"
        >
            <option value="" disabled>
                {placeholder}
            </option>
            {data.map((i) => (
                <option key={i.value} value={i.value}>
                    {i.title}
                </option>
            ))}
        </Field>
    );
};

export default Dropdown;
