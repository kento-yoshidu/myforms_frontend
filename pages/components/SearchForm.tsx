import React, { useState } from "react";

export const SearchForm = () => {
  const [value, setValue] = useState<string>("")

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  const onClick = () => {
    // 検索の処理
  }

  return (
    <div>
      <input type="text" onChange={onchange} value={value} />
      <button onClick={onClick}>検索</button>
    </div>
  )
}
