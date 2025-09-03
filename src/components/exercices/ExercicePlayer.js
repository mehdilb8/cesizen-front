import React, { useState, useRef } from 'react';
import { startSession, endSession } from '../../services/sessionService';

const steps = [
  { key: 'inspiration', label: 'Inspiration', color: '#4CAF50' },
  { key: 'apnee', label: 'Apnée', color: '#FFD600' },
  { key: 'expiration', label: 'Expiration', color: '#81C784' }
];

const ExercicePlayer = ({ exercice }) => {
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [cycle, setCycle] = useState(1);
  const timerRef = useRef(null);
  const [sessionId, setSessionId] = useState(null);
  const [ressentiAvant] = useState(5); // valeur par défaut pour le ressenti avant

  const durations = [
    exercice.duree_inspiration,
    exercice.duree_apnee,
    exercice.duree_expiration
  ];

  const totalCycles = exercice.nb_cycles_recommandes || 10;



  const handleStart = async () => {
    try {
      const session = await startSession({
        exerciceId: exercice.id_exercice,
        cycles: exercice.nb_cycles_recommandes,
        ressentiAvant: ressentiAvant
      });
      setSessionId(session.id_session);
      setStarted(true);
      setStepIndex(0);
      setTimeLeft(durations[0]);
      setCycle(1);
      runStep(0, 1);
    } catch (error) {
      console.error('Erreur lors du démarrage de la session:', error);
    }
  };

  const runStep = (currentStep, currentCycle) => {
    setStepIndex(currentStep);
    setTimeLeft(durations[currentStep]);
    if (durations[currentStep] === 0) {
      // Skip step if duration is 0
      nextStep(currentStep, currentCycle);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          nextStep(currentStep, currentCycle);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const nextStep = (currentStep, currentCycle) => {
    if (currentStep < 2) {
      runStep(currentStep + 1, currentCycle);
    } else {
      // Fin du cycle
      if (currentCycle < totalCycles) {
        runStep(0, currentCycle + 1);
        setCycle(currentCycle + 1);
      } else {
        setStarted(false);
        setStepIndex(0);
        setTimeLeft(0);
        setCycle(1);
        handleEnd();
      }
    }
  };

  const stop = () => {
    clearInterval(timerRef.current);
    setStarted(false);
    setStepIndex(0);
    setTimeLeft(0);
    setCycle(1);
  };

  const handleEnd = async () => {
    try {
      if (sessionId) {
        await endSession(sessionId, {
          ressentiApres: 5, // valeur par défaut
          commentaire: '' // commentaire vide
        });
        console.log('Session terminée avec succès');
      }
    } catch (error) {
      console.error('Erreur lors de la fin de session:', error);
    }
  };

  // Progression pour le cercle
  const currentDuration = durations[stepIndex];
  const progress = currentDuration ? ((currentDuration - timeLeft) / currentDuration) * 100 : 0;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 32, gap: 16
    }}>
      {!started ? (
        <button
          onClick={handleStart}
          style={{
            background: exercice.couleur_theme || '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '12px 32px',
            fontSize: 18,
            fontWeight: 700,
            cursor: 'pointer',
            marginBottom: 12
          }}
        >
          Démarrer l'exercice
        </button>
      ) : (
        <button
          onClick={stop}
          style={{
            background: '#E57373',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '8px 24px',
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
            marginBottom: 8
          }}
        >
          Arrêter
        </button>
      )}
      {started && (
        <>
          <div style={{ margin: '16px 0' }}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle
                cx="60" cy="60" r="54"
                stroke="#e0e0e0" strokeWidth="12" fill="none"
              />
              <circle
                cx="60" cy="60" r="54"
                stroke={steps[stepIndex].color}
                strokeWidth="12"
                fill="none"
                strokeDasharray={339.292}
                strokeDashoffset={339.292 - (progress / 100) * 339.292}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
              <text x="50%" y="54%" textAnchor="middle" fontSize="32" fill="#222" dy=".3em">
                {timeLeft}
              </text>
            </svg>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: steps[stepIndex].color, marginBottom: 8 }}>
            {steps[stepIndex].label}
          </div>
          <div style={{ fontSize: 16, color: '#222', marginBottom: 4 }}>
            Cycle {cycle} / {totalCycles}
          </div>
        </>
      )}
    </div>
  );
};

export default ExercicePlayer; 