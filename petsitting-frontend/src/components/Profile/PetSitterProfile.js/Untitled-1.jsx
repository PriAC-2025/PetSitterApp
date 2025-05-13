

import PropTypes from 'prop-types';

const PetSitterProfile = ({ petSitter }) => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{petSitter.name}</h1>
            <p><strong>Localização:</strong> {petSitter.location}</p>
            <p><strong>Email:</strong> <a href={`mailto:${petSitter.email}`}>{petSitter.email}</a></p>
            {petSitter.socialMedia && (
                <p>
                    <strong>Redes Sociais:</strong>
                    {petSitter.socialMedia.map((profile, index) => (
                        <span key={index}>
                            <a href={profile.url} target="_blank" rel="noopener noreferrer">
                                {profile.platform}
                            </a>
                            {index < petSitter.socialMedia.length - 1 && ', '}
                        </span>
                    ))}
                </p>
            )}
            <h2>Experiências Profissional</h2>
            <ul>
                {petSitter.experience.map((job, index) => (
                    <li key={index}>
                        <strong>{job.title}</strong> em {job.company} ({job.startYear} - {job.endYear})
                        <p>{job.description}</p>
                    </li>
                ))}
            </ul>
            <h2>Cursos e Certificações</h2>
            <ul>
                {petSitter.courses.map((course, index) => (
                    <li key={index}>
                        <strong>{course.title}</strong> - {course.institution} ({course.year})
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        maxWidth: '600px',
        margin: '20px auto',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    },
    title: {
        marginBottom: '10px',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px',
    },
};

PetSitterProfile.propTypes = {
    petSitter: PropTypes.shape({
        name: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        socialMedia: PropTypes.arrayOf(
            PropTypes.shape({
                platform: PropTypes.string.isRequired,
                url: PropTypes.string.isRequired,
            })
        ),
        experience: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string.isRequired,
                company: PropTypes.string.isRequired,
                startYear: PropTypes.number.isRequired,
                endYear: PropTypes.number.isRequired,
                description: PropTypes.string,
            })
        ).isRequired,
        courses: PropTypes.arrayOf(
            PropTypes.shape({
                title: PropTypes.string.isRequired,
                institution: PropTypes.string.isRequired,
                year: PropTypes.number.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default PetSitterProfile;