import React, {useState} from 'react'

const Toggle = () => {
  const [checked, setChecked] = useState<boolean>(true);

    return (
        <>
          {/* <label>
      <input type="checkbox"
        defaultChecked={checked}
        onChange={() => setChecked(!checked)}
      />
      Check Me!
    </label> */}

<button className="btn btn-primary">DaisyUI Button</button>

        </>
    )
}

export default Toggle
