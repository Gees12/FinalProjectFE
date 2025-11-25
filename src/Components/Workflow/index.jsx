import { useState, useEffect } from 'react';
import { CheckCircle2, Plus, Edit2, Trash2 } from 'lucide-react';
import { fallbackBenefits } from '../../Constants';

// Styling-only changes: colors and font to match screenshots.
// NOTE: logic/state/API untouched.

const accentGradient = 'linear-gradient(90deg,#ec4899 0%, #f43f5e 100%)'; // pink -> orange
const accentSolid = '#f43f5e';
const accentMuted = '#fbcfe8';
const iconAccent = '#ec4899';

const Workflow = () => {
  const [benefits, setBenefits] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState(null);
  const [newBenefit, setNewBenefit] = useState({ title: '', description: '' });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array gambar untuk slideshow
  const images = [
    "/src/assets/profile-pictures/gambar1.jpg",
    "/src/assets/profile-pictures/gambar3.jpg",
    "/src/assets/profile-pictures/gambar4.jpg",
    "/src/assets/profile-pictures/gambar5.jpg",
    "/src/assets/profile-pictures/gambar.jpg"
  ];

  useEffect(() => {
    fetchBenefits();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Ganti gambar setiap 5 detik

    return () => clearInterval(interval);
  }, [images.length]);

  const fetchBenefits = async () => {
    try {
      const response = await fetch('http://localhost:3002/subscriptionBenefits');
      if (response.ok) {
        const data = await response.json();
        setBenefits(data);
      } else {
        throw new Error('API not available');
      }
    } catch (error) {
      console.log('Using fallback data for benefits');
      setBenefits(fallbackBenefits);
    }
  };

  const handleCreate = async () => {
    if (!newBenefit.title || !newBenefit.description) return;
    
    try {
      const response = await fetch('http://localhost:3002/subscriptionBenefits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newBenefit,
          id: Date.now()
        }),
      });
      
      if (response.ok) {
        setNewBenefit({ title: '', description: '' });
        fetchBenefits();
      }
    } catch (error) {
      console.log('Create failed, updating local state only');
      const newBenefitWithId = {
        ...newBenefit,
        id: Date.now()
      };
      setBenefits(prev => [...prev, newBenefitWithId]);
      setNewBenefit({ title: '', description: '' });
    }
  };

  const handleUpdate = async () => {
    if (!editingBenefit) return;
    
    try {
      const response = await fetch(`http://localhost:3002/subscriptionBenefits/${editingBenefit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingBenefit),
      });
      
      if (response.ok) {
        setIsEditing(false);
        setEditingBenefit(null);
        fetchBenefits();
      }
    } catch (error) {
      console.log('Update failed, updating local state only');
      setBenefits(prev => prev.map(benefit => 
        benefit.id === editingBenefit.id ? editingBenefit : benefit
      ));
      setIsEditing(false);
      setEditingBenefit(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3002/subscriptionBenefits/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchBenefits();
      }
    } catch (error) {
      console.log('Delete failed, updating local state only');
      setBenefits(prev => prev.filter(benefit => benefit.id !== id));
    }
  };

  const startEdit = (benefit) => {
    setIsEditing(true);
    setEditingBenefit({ ...benefit });
  };

  return (
    // Note: only styling changes below (colors + font). Structure unchanged.
    <div className="mt-20 font-sans" style={{ fontFamily: "'Poppins', 'Inter', system-ui, -apple-system" }}>
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
        Everything you get with{" "}
        <span
          className="text-transparent bg-clip-text"
          style={{
            backgroundImage: 'linear-gradient(90deg,#67e8f9 0%, #2dd4bf 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text'
          }}
        >
          VisualPlay Premium
        </span>
      </h2>

      {/* Add/Edit Form */}
      <div className="mt-12 max-w-4xl mx-auto px-4">
        <div className="rounded-2xl border shadow-2xl overflow-hidden"
             style={{ background: 'linear-gradient(180deg,#0b0b0b 0%, #0f0f10 100%)', borderColor: '#191919' }}>
          {/* Header */}
          <div className="border-b px-6 sm:px-8 py-5" style={{ background: 'linear-gradient(90deg, rgba(255,107,95,0.05), rgba(255,195,160,0.04))', borderColor: '#191919' }}>
            <h3 className="text-2xl font-bold flex items-center gap-3"
                style={{ backgroundImage: accentGradient, WebkitBackgroundClip: 'text', color: 'transparent' }}>
              {isEditing ? (
                <>
                  <Edit2 size={24} style={{ color: iconAccent }} />
                  Edit Benefit
                </>
              ) : (
                <>
                  <Plus size={24} style={{ color: iconAccent }} />
                  Add New Benefit / Change Your Benefit
                </>
              )}
            </h3>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
                Benefit Title
              </label>
              <input
                type="text"
                placeholder="Enter benefit title..."
                value={isEditing ? editingBenefit?.title : newBenefit.title}
                onChange={(e) => isEditing 
                  ? setEditingBenefit({...editingBenefit, title: e.target.value})
                  : setNewBenefit({...newBenefit, title: e.target.value})
                }
                className="w-full px-4 py-3 rounded-xl text-white placeholder-neutral-500 border transition-all outline-none"
                style={{
                  background: 'rgba(20,20,20,0.6)',
                  borderColor: '#2b2b2b',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)'
                }}
              />
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
                Description
              </label>
              <textarea
                placeholder="Enter benefit description..."
                value={isEditing ? editingBenefit?.description : newBenefit.description}
                onChange={(e) => isEditing
                  ? setEditingBenefit({...editingBenefit, description: e.target.value})
                  : setNewBenefit({...newBenefit, description: e.target.value})
                }
                className="w-full px-4 py-3 rounded-xl text-white placeholder-neutral-500 border transition-all outline-none resize-none"
                rows="4"
                style={{
                  background: 'rgba(20,20,20,0.6)',
                  borderColor: '#2b2b2b',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)'
                }}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleUpdate}
                    className="flex-1 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                    style={{ backgroundImage: accentGradient, boxShadow: '0 10px 30px rgba(255,107,95,0.12)' }}
                  >
                    <CheckCircle2 size={18} style={{ color: '#fff' }} />
                    Update Benefit
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditingBenefit(null);
                    }}
                    className="px-6 py-3 rounded-xl font-semibold"
                    style={{ background: '#121212', color: '#dcdcdc', border: '1px solid #2b2b2b' }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleCreate}
                  className="w-full text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                  style={{ backgroundImage: accentGradient, boxShadow: '0 10px 30px rgba(255,107,95,0.12)' }}
                >
                  <Plus size={20} style={{ color: '#fff' }} />
                  Add Benefit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Background image dengan text overlay */}
      <div className="relative mt-10 left-0 right-0 w-screen ml-[calc(50%-50vw)] min-h-screen">
        {/* Background Images dengan Transition */}
        <div className="absolute inset-0 w-full h-full">
          {images.map((img, index) => (
            <img 
              key={index}
              src={img} 
              alt={`Netflix background ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
              }}
            />
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentImageIndex 
                  ? 'w-8' 
                  : 'w-2'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              style={{ background: index === currentImageIndex ? accentSolid : 'rgba(255,255,255,0.45)' }}
            />
          ))}
        </div>

        {/* Gradient Overlay - dari tengah ke kanan */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.6), rgba(0,0,0,0.7))' }}></div>

        {/* Content Container */}
        <div className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          {/* Benefits List - tengah */}
          <div className="w-full max-w-3xl space-y-6 lg:space-y-8">
            {benefits.slice(0, 6).map((benefit) => (

              <div key={benefit.id} className="flex relative group p-4 rounded-lg hover:transition-all"
                   style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.03)' }}>
                {/* Edit/Delete Buttons */}
                <div className="absolute -left-2 top-2 sm:-left-16 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => startEdit(benefit)}
                    className="p-1.5 rounded transition-colors shadow-lg"
                    style={{ background: '#1b9ed8' }}
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(benefit.id)}
                    className="p-1.5 rounded transition-colors shadow-lg"
                    style={{ background: '#ff6b5f' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="mr-4 h-10 w-10 p-2 flex justify-center items-center rounded-full flex-shrink-0"
                     style={{ background: 'rgba(20,20,20,0.75)', color: iconAccent }}>
                  <CheckCircle2 />
                </div>
                <div>
                  <h5 className="mb-2 text-lg sm:text-xl font-semibold text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>{benefit.title}</h5>
                  <p className="text-sm sm:text-base" style={{ color: '#dcdcdc', textShadow: '0 1px 4px rgba(0,0,0,0.45)' }}>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workflow;
