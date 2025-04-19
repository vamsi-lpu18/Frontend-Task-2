import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import api from '../services/api'

const StatusContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  background-color: ${(props) => (props.isOnline ? '#4CAF50' : '#f44336')};
  color: white;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
`

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: white;
  animation: ${(props) => props.isOnline ? 'pulse 2s infinite' : 'none'};

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`

function StatusIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [lastStatus, setLastStatus] = useState(true)

  useEffect(() => {
    let mounted = true
    let checkInterval

    const checkNetworkStatus = async () => {
      try {
        const status = await api.checkNetworkStatus()
        if (!mounted) return

        // Only update and show toast if status changed
        if (status !== lastStatus) {
          setIsOnline(status)
          setLastStatus(status)
          
          if (status) {
            toast.success('You are back online!', {
              position: 'bottom-right',
              autoClose: 3000,
              hideProgressBar: true,
            })
          } else {
            toast.error('You are offline. Please check your connection.', {
              position: 'bottom-right',
              autoClose: false,
              hideProgressBar: true,
            })
          }
        }
      } catch (error) {
        console.error('Network status check failed:', error)
        if (!mounted) return
        setIsOnline(false)
        setLastStatus(false)
      }
    }

    // Check immediately
    checkNetworkStatus()

    // Set up interval for checking
    checkInterval = setInterval(checkNetworkStatus, 5000)

    // Clean up
    return () => {
      mounted = false
      clearInterval(checkInterval)
    }
  }, [lastStatus])

  return (
    <StatusContainer isOnline={isOnline}>
      <StatusDot isOnline={isOnline} />
      {isOnline ? 'Online' : 'Offline'}
    </StatusContainer>
  )
}

export default StatusIndicator 