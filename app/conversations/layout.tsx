import getConversation from "../actions/getConversation";
import Sidebar from "../components/sidebar/Sidebar";
import CoversationList from "./components/CoversationList";

async function ConversationsLayout(
    { children }: { children: React.ReactNode }
) {
    const conversations = await getConversation();
    return (
        <Sidebar>
            <div className="h-full">
                <CoversationList initialItems={conversations}/>
                {children}
            </div>
        </Sidebar>
    )
}

export default ConversationsLayout;
