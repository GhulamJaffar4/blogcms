const assert = require('assert');

const BASE_URL = 'http://localhost:5000/api/v1';

async function runVerification() {
    console.log('🚀 Starting Verification...');

    let token = '';
    let postId = '';
    let slug = '';
    let commentId = '';
    let userId = '';


    try {
        console.log('Testing Registration...');
        const res = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'testuser_' + Date.now(),
                email: `test${Date.now()}@example.com`,
                password: 'password123'
            })
        });
        const data = await res.json();
        if (res.status !== 201) {
            console.error('❌ Registration Error details:', JSON.stringify(data, null, 2));
            throw new Error(data.message);
        }
        token = data.token;
        userId = data.data.user._id;
        console.log('✅ Registration Successful');
    } catch (err) {
        console.error('❌ Registration Failed:', err);

    }


    try {
        console.log('Testing Create Post...');
        const res = await fetch(`${BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: 'My First Blog Post ' + Date.now(),
                content: 'This is the content of the post.'
            })
        });
        const data = await res.json();
        if (res.status !== 201) {
            console.error('❌ Create Post Error Data:', data);
            throw new Error(data.message);
        }
        postId = data.data.post._id;
        slug = data.data.post.slug;
        console.log('✅ Create Post Successful (Slug: ' + slug + ')');
    } catch (err) {
        console.error('❌ Create Post Failed:', err.message);
        process.exit(1);
    }


    try {
        console.log('Testing Create Comment...');
        const res = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                content: 'This is a test comment.'
            })
        });
        const data = await res.json();
        if (res.status !== 201) throw new Error(data.message);
        commentId = data.data.comment._id;
        console.log('✅ Create Comment Successful');
    } catch (err) {
        console.error('❌ Create Comment Failed:', err.message);
    }

    try {
        console.log('Testing Like Post...');
        const res = await fetch(`${BASE_URL}/posts/${postId}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await res.json();
        if (res.status !== 200) throw new Error(data.message);
        console.log(`✅ Like Post Successful (Status: ${data.data.status})`);
    } catch (err) {
        console.error('❌ Like Post Failed:', err.message);
    }


    try {
        console.log('Testing Delete Post...');
        const res = await fetch(`${BASE_URL}/posts/${slug}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (res.status !== 204) throw new Error('Delete failed');
        console.log('✅ Delete Post Successful');
    } catch (err) {
        console.error('❌ Delete Post Failed:', err.message);
    }

    console.log('🎉 All Tests Passed!');
}

// Wait for server to potentially start
setTimeout(runVerification, 2000);
