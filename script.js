document.getElementById('resumeForm').addEventListener('input', updateResume);

function updateResume() {
    document.getElementById('displayName').textContent = document.getElementById('name').value;
    document.getElementById('displayEmail').textContent = document.getElementById('email').value;
    document.getElementById('displayPhone').textContent = document.getElementById('phone').value;
    document.getElementById('displayExperience').textContent = document.getElementById('experience').value;
    document.getElementById('displaySkills').textContent = document.getElementById('skills').value;
    generateShareableLink();
}

document.getElementById('generateResume').addEventListener('click', function() {
    document.getElementById('resumeDisplay').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('downloadResume').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Resume", 10, 10);
    doc.text("Name: " + document.getElementById('displayName').textContent, 10, 20);
    doc.text("Email: " + document.getElementById('displayEmail').textContent, 10, 30);
    doc.text("Phone: " + document.getElementById('displayPhone').textContent, 10, 40);
    doc.text("Experience: " + document.getElementById('displayExperience').textContent, 10, 50);
    doc.text("Skills: " + document.getElementById('displaySkills').textContent, 10, 60);
    doc.save("Resume.pdf");
});

function generateShareableLink() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    const baseUrl = window.location.href.split('?')[0];
    const uniqueID = Math.random().toString(36).substring(2, 15);
    const shareableUrl = `${baseUrl}?resumeID=${uniqueID}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&experience=${encodeURIComponent(experience)}&skills=${encodeURIComponent(skills)}`;
    document.getElementById('shareableLink').value = shareableUrl;
}

document.getElementById('copyLinkButton').addEventListener('click', function() {
    const linkField = document.getElementById('shareableLink');
    linkField.select();
    navigator.clipboard.writeText(linkField.value).then(() => {
        alert("Link copied to clipboard!");
    });
});

document.getElementById('whatsappShare').addEventListener('click', function() {
    const shareableLink = document.getElementById('shareableLink').value;
    window.open(`https://wa.me/?text=${encodeURIComponent(shareableLink)}`, '_blank');
});

document.getElementById('emailShare').addEventListener('click', function() {
    const shareableLink = document.getElementById('shareableLink').value;
    window.location.href = `mailto:?subject=Check out this Resume&body=${encodeURIComponent(shareableLink)}`;
});

document.getElementById('facebookShare').addEventListener('click', function() {
    const shareableLink = document.getElementById('shareableLink').value;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableLink)}`, '_blank');
});

document.getElementById('twitterShare').addEventListener('click', function() {
    const shareableLink = document.getElementById('shareableLink').value;
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareableLink)}`, '_blank');
});
