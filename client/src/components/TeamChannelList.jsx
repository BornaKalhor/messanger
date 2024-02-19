import React from 'react'
import { AddChannel } from '../assets/AddChannel'
const TeamChannelList = ({ children, error=false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
    if(error){
        console.log(error)
        return type === 'team' ? (
            <div className="team-channel-list">
                <p className="team-channel-list__message">
                    خطا در برقراری ارتباط!
                </p>
            </div>
        ) : null
    }

    if(loading) {
        return (
            <div className="team-channel-list">
                <p className="team-channel-list__message loading">
                    در حال بارگزاری{ type === 'team' ? ' کانال ها...' : ' پیام ها...'}
                </p>
            </div>

        )
    }
    return (
        <div className="team-channel-list">
            <div className="team-channel-list__header">
                <p className="team-channel-list__header__title">
                    {type === 'team' ? 'کانال ها' : 'پیام های شخصی'}
                </p>
                <AddChannel
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCrateType={setCreateType}
                    setIsEditing={setIsEditing}
                    type={type==='team' ? 'team' : "messaging"}
                    setToggleContainer={setToggleContainer}

                />
            </div>
            {children}

        </div>
    )
}

export default TeamChannelList;