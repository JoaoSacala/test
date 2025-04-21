import { createServer } from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";
import { parse } from "node:url"; 

interface UserProfile {
    id: number;
    name: string;
    email: string;
    avatarUrl: string
}

const userProfile: UserProfile = {
    id: 1,
    name: 'Joao Sacala',
    email: 'joaosacala88@gmail.com',
    avatarUrl: 'https://github.com/JoaoSacala.png'
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    const url = parse(req.url || '', true);
    const method = req.method

    if (url.pathname === '/profile' && method === 'GET') {
        res.writeHead(200, {'content-type': 'application/json'})
        res.end(JSON.stringify(userProfile))
    }

    else if (url.pathname === '/profile/avatar' && method === 'PATCH') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        })
        req.on('end', () => {
            const { avatarUrl } = JSON.parse(body);
            if (avatarUrl) {
                userProfile.avatarUrl = avatarUrl;
                res.writeHead(200, { 'content-type': 'application/json' });
                res.end(JSON.stringify({ message: 'Avatar URL update sucessfully' }));
            } else {
                res.writeHead(400, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ error: 'invalid avatar URL' }));
            }
        });
    }

    else if (url.pathname === '/profile' && method === 'PUT') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { name, email } = JSON.parse(body);
            if (name && email) {
                userProfile.name = name;
                userProfile.email = email;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Profile updated successfully' }));
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Invalid profile data' }));
            }
        });
    }

    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Route not found" }));
      }
})

server.listen(3333, () => {
    console.log("🔥 Server is running at http://localhost:3333");
  });