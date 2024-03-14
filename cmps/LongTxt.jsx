const { useState } = React

export function LongTxt({ txt, length = 30}) {
  const [slicedTxt, setSlicedTxt] = useState(txt.slice(0, length))

  return (
    <section className="long-txt">
      <p>
        {slicedTxt}...
      </p>
    </section>
  )
}

