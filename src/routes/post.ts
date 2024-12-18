import express from 'express';
import PostManager from '../business/post';
import { CreatePostSchema, UpdatePostSchema } from '../domain/schemas/post';
import { requestValidator } from '../middleware/request_validator';
import { authorize } from '../middleware/authorize';
import { UserRole } from '@prisma/client';
const router: express.Router = express.Router();
const postManager = new PostManager();

// Get all posts with optional filters and sorting
router.get('/', authorize([UserRole.USER]), async (req, res) => {
    const { search, createdAt } = req.query;

    // Construct filters and sort objects from query parameters
    const filters: any = {};
    if (search) filters.search = search;

    const sort = createdAt ? { createdAt: createdAt === 'asc' ? 'asc' : 'desc' } : {};

    const posts = await postManager.getAllPosts(filters, sort);
    res.send(posts);
});

// Get a post by ID
router.get('/:id',
    authorize([UserRole.USER]),
    async (req, res) => {
        const post = await postManager.getPostById(req.params.id);
        console.log(post);

        res.send(post);
    });

// Get posts by user ID
router.get('/user/:userId',
    authorize([UserRole.USER]),
    async (req, res) => {
        const posts = await postManager.getPostsByUserId(req.params.userId);
        res.send(posts);
    });

// Create a new post
router.post('/', authorize([UserRole.USER]), requestValidator(CreatePostSchema), async (req, res) => {

    const post = await postManager.create({ ...req.body, authorId: req.user.userId });

    res.send(post)
});

// Update an existing post
router.put('/:id', authorize([UserRole.USER]), requestValidator(UpdatePostSchema), async (req, res) => {
    const post = await postManager.update({ id: req.params.id, ...req.body });
    res.send(post);
});

// Delete a post
router.delete('/:id', authorize([UserRole.USER]), async (req, res) => {
    const isDeleted = await postManager.delete(req.params.id);
    res.send(isDeleted)
});

export default router;
