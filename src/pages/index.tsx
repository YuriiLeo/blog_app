import CreatePostForm from '../components/CreatePostForm';
import PostList from '../components/PostList';
import Layout from './layout';

const Home: React.FC = () => {
	return (
		<Layout>
			<PostList />
			<CreatePostForm />
		</Layout>
	);
};

export default Home;
