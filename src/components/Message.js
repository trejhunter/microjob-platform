const getStyle = (props) => {
  let baseClass = 'alert ';
  if (props.message.msgError) baseClass += 'alert-danger';
  else baseClass += 'alert-success';
  return baseClass + ' text-center';
};

const Message = (props) => (
  <div className={getStyle(props)} role='alert'>
    {props.message.msgBody}
  </div>
);

export default Message;
