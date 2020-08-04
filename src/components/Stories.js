import React, { useEffect, useState } from 'react';
import { Container, Header, Image, Item } from 'semantic-ui-react';
import axios from 'axios';

const Stories = () => {
    const [blogs, setBlogs] = useState([]);
    
    useEffect(() => {
        console.log('Getting all of the blogs!');
        axios.get('/api/blogs')
            .then(res => {
                console.log('Res.data.blogs: ', res.data.blogs);
                const fetchedBlogs = res.data.blogs;
                if (fetchedBlogs) {
                    setBlogs(fetchedBlogs);
                }
            })
            .catch(error => console.error(error))
    }, [])

    return (
        <>
            <Container fluid>
                <Container style={{
                    background: 'purple',
                    height: '750px',
                    width: '100vw',
                    backgroundImage: `url('/resources/hiker_lake-tree.jpg')`,
                    backgroundSize: 'cover',
                }}>
                    <Header inverted color='orange' textAlign='right' style={{ fontFamily: 'Ultra', fontSize: '6rem', paddingRight: '50px', paddingTop: '50px' }}>Your Stories</Header>
                </Container>
            </Container>
            <Item.Group
                style={{
                    padding: '10px'
                }}
            >
                {blogs ?
                    blogs.map((blog, index) => {
                        const { title, authorId, blogText, username } = blog;
                        return (
                            <Item
                                key={index}
                                style={{
                                    borderTop: '2px solid grey',
                                    borderBottom: '2px solid grey',
                                    padding: '15px 0'
                                }}
                            >
                                <Item.Content>
                                    <Item.Header
                                        // as='a'
                                        style={{
                                            fontSize: '2rem',
                                            textDecoration: 'underline'
                                        }}
                                    >
                                        {title}
                                    </Item.Header>
                                    <Item.Meta
                                        style={{
                                            fontSize: '1.3rem'
                                        }}
                                    >
                                        By: <b>{username}</b>
                                    </Item.Meta>
                                    <Item.Extra
                                        style={{
                                            fontSize: '1rem'
                                        }}
                                    >
                                        {blogText}
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        )
                    })

                    : ''
                }
            </Item.Group>
        </>
    )
};

export default Stories;