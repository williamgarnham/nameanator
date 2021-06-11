const List = (props) => {
  const items = props.items
  const listItems = items.map((item)=>
    <li>{item}</li>)

  const listStyle = {
    listStyleType: "upper-roman",
    listStylePosition: "inside",
    paddingRight: "50px",

  };

  return(
    <div>
      <ol style={listStyle}>
        {listItems}
      </ol>
    </div>
  )
}

export default List;
