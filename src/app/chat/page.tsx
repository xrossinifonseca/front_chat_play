import ChatRoom from "@/components/chatroom/ChatRoom";

const Chat = () => {
  return (
    <div className="min-h-screen grid place-items-center relative p-2">
      <div className="flex flex-col items-center justify-center max-w-[1100px] w-full p-5 max-h-[700px] h-full gap-5">
        {/* <ContactsContainer /> */}
        <h1 className="text-xl lg:text-3xl text-center text-light-pink font-semibold">
          Conecte-se com outros apaixonados <br /> pela mesma causa.{" "}
        </h1>
        <ChatRoom />
      </div>
    </div>
  );
};

export default Chat;
