import './App.css'
import { Button } from './components/ui/Button'
import { SectionCard } from './components/ui/SectionCard'

function App() {
  return (
    <main style={{ padding: 'var(--space-6)', maxWidth: '48rem' }}>
      <h1 style={{ marginTop: 0 }}>Design Playground</h1>
      <SectionCard title="Buttons">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
      </SectionCard>
      <SectionCard title="Typography">
        <h3 className="ft-text-display-sm">Sample Headline</h3>
        <p className="ft-text-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ex lacus, posuere vitae ante auctor, imperdiet venenatis odio. Vivamus tincidunt facilisis velit, in faucibus magna elementum eget. Vivamus pulvinar ante mi, imperdiet suscipit tortor venenatis ut. Vivamus in tempus diam. Sed ullamcorper at ex vel tincidunt. Aenean volutpat convallis vestibulum. Morbi tempus est non ex imperdiet, nec tincidunt ipsum interdum. Nulla sed dui mauris. Nam tempor augue eget mi scelerisque rhoncus. Suspendisse quis aliquam sapien. Phasellus arcu mauris, semper non placerat quis, porta ut tellus. Nam rutrum facilisis odio. Pellentesque nisi augue, rutrum at odio vitae, molestie ornare nibh. Aenean tincidunt, erat vitae vulputate mollis, dolor erat aliquet massa, ut molestie dui metus eget massa.</p>
      </SectionCard>
    </main>
  )
}

export default App
