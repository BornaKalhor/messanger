import React from 'react';
import {Channel, channel, useChatContext, MessageSimple} from "stream-chat-react";
import {ChannelInner, CreateChannel, EditChannel} from './'


const ChannelContainer = ({isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {
    const {channel} = useChatContext();

    if (isCreating) {
        return (
            <div className="channel__container">
                <CreateChannel createType={createType} setIsCreating={setIsCreating}/>
            </div>
        );
    }

    if (isEditing) {
        return (
            <div className="channel__container">
                <EditChannel setIsEditing={setIsEditing}/>
            </div>
        )
    }

    const EmptyState = () => {
        return (
            <div className="channel-empty__container">
                <p className="channel-empty__first">
                    آغاز پیام ها
                </p>

                <p className="channel-empty__second">
                    برای شروع پیامی ارسال کنید
                </p>
            </div>)

    }

    const elements = document.querySelectorAll('.str-chat__channel-list');


    elements.forEach(element => {
        element.style.background = 'none';
    });


    return (
        <div className="channel__container">
            <Channel
                EmptyStateIndicator={EmptyState}
                Message={(messageProps, i) => <MessageSimple key={i} {...messageProps} />}
            >
                <ChannelInner setIsEditing={setIsEditing}/>
            </Channel>
        </div>
    );
}

export default ChannelContainer;
