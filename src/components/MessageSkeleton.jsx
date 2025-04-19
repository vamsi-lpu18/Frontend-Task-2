import styled from 'styled-components'

const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`

const SkeletonMessage = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background-color: #f0f0f0;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 0.6;
    }
  }
`

const SkeletonAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
`

const SkeletonContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const SkeletonLine = styled.div`
  height: 16px;
  background-color: #e0e0e0;
  border-radius: 4px;
  width: ${(props) => props.width || '100%'};
`

const MessageSkeleton = ({ count = 3 }) => {
  return (
    <SkeletonContainer>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonMessage key={index}>
          <SkeletonAvatar />
          <SkeletonContent>
            <SkeletonLine width="40%" />
            <SkeletonLine width="80%" />
            <SkeletonLine width="60%" />
          </SkeletonContent>
        </SkeletonMessage>
      ))}
    </SkeletonContainer>
  )
}

export default MessageSkeleton 