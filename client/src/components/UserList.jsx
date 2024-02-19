import React, {useEffect, useState} from 'react';
import {Avatar, useChatChannel, useChatContext} from 'stream-chat-react';
import {InviteIcon} from '../assets/InviteIcon'
import {cleanup} from "@testing-library/react";


const ListContainer = ({children}) => {
    return (
        <div className="user-list__container">
            <div className="user-list__header">
                <p>کاربر</p>
                <p>اضافه کردن</p>
            </div>
            {children}
        </div>
    );
};

const UserItem = ({user, setSelectedUsers}) => {
    const [selected, setSelected] = useState(false);

    const handleSelect = () => {
        if (selected) {
            setSelected((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
        } else {
            setSelectedUsers((prevUsers) => [...prevUsers, user.id])
        }
        setSelected((prevSelected) => !prevSelected);
    }

    return (
        <div className="user-item__wrapper" onClick={handleSelect}>
            <div className="user-item__name-wrapper">
                <Avatar image={user.image} name={user.fullName || user.id} size={32}/>
                <p className="user-item__name">{user.fullName || user.id}</p>
            </div>
            {selected ? <InviteIcon/> : <div className="user-item__invite-empty"/>}
        </div>
    )

}

const UserList = ( {setSelectedUsers} ) => {
    const {client} = useChatContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listEmpty, setListEmpty] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        const getUsers = async () => {
            if(loading) return;
            setLoading(true);

            try {
                const response = await client.queryUsers(
                    { id: { $ne: client.userID }},
                    {id: 1},
                    {limit: 8}
                );

                if (response.users.length) {
                    setUsers(response.users);
                } else{
                    setListEmpty(true);
                }

            } catch (error){
                setError(true);
            }
            setLoading(false);
        }

        if (client) {
            getUsers()
        }
    }, []);

    if (error) {
        return(
            <div className="user-list__message">
                خطایی رخ داد. لطفا دوباره تلاش کنید.
            </div>
        )
    }


    if (listEmpty) {
        return(
            <div className="user-list__message">
                کاربری پیدا نشد.
            </div>
        )
    }

    return (
        <ListContainer>
            {loading ? <div className="user-list__message">
                بارگزاری کاربران
            </div> : (
                users?.map((user, i) => (
                    <UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers}/>
                ))


            )}
        </ListContainer>
    );
};

export default UserList;
