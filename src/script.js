import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'


// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 
//                             Base
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░           
// ☰☰☰☰☰☰ Debug ☰☰☰☰☰☰
const gui = new GUI()

// ☰☰☰☰☰☰ Canvas ☰☰☰☰☰☰
const canvas = document.querySelector('canvas.webgl')

// ☰☰☰☰☰☰ Scene ☰☰☰☰☰☰
const scene = new THREE.Scene()


// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
//                            Main Chapel
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   

// ☰☰☰☰☰☰ Ground ☰☰☰☰☰☰
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20),
    new THREE.MeshStandardMaterial({
    })
)
ground.rotation.x = - Math.PI / 2
scene.add(ground)


// ☰☰☰☰☰☰ Chapel container ☰☰☰☰☰☰
const chapel = new THREE.Group()
scene.add(chapel)


// ☰☰☰☰☰☰ Main walls ☰☰☰☰☰☰
const mainWalls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 5.5),
    new THREE.MeshStandardMaterial({
        color: '#aa00aa' 
    })
)
mainWalls.position.y = 2.5 / 2  // Raise walls so they sit on the ground
chapel.add(mainWalls)


// ☰☰☰☰☰☰ Main roof ☰☰☰☰☰☰
const mainRoofGroup = new THREE.Group()

// Left panel
const leftPanel = new THREE.Mesh(
  new THREE.BoxGeometry(3, 0.1, 5.8),
  new THREE.MeshStandardMaterial({ color: '#FF0000' })
)

leftPanel.rotation.z = -Math.PI / 4
leftPanel.position.x = 1.05
leftPanel.position.y = 3.5 

// right panel
const rightPanel = leftPanel.clone()
rightPanel.rotation.z = Math.PI / 4
rightPanel.position.x = -1.05
leftPanel.position.y = 3.5

mainRoofGroup.add(leftPanel, rightPanel) // Adds the panels to the mainRoofGroup
chapel.add(mainRoofGroup) // Adds the mainRoofGroup to the chapel 


// ☰☰☰☰☰☰ Traingle sahpe gap between roof panels ☰☰☰☰☰☰
const triangleGroup = new THREE.Group()

const triangleOutline = new THREE.Shape()
triangleOutline.moveTo(-2.1, 0)  // Bottom-left corner (x, y)
triangleOutline.lineTo(0, 2.1)  // Top peak 
triangleOutline.lineTo(2.1, 0)   // Bottom-right corner 

const fronttriangle = new THREE.Mesh(
    new THREE.ShapeGeometry(triangleOutline), // Passing the gableOutlile to the geometry
    new THREE.MeshStandardMaterial({
        color: '#ff33ff',
        side: THREE.DoubleSide
    })
)
fronttriangle.position.set(0, 2.4, 2.76)

const backtriangle = fronttriangle.clone()
backtriangle.position.set(0, 2.4, -2.76)
backtriangle.material.color.set('#ff33ff')

triangleGroup.add(fronttriangle, backtriangle)
chapel.add(triangleGroup)



// ☰☰☰☰☰☰ Tower walls ☰☰☰☰☰☰
const towerGroup = new THREE.Group()

// Tower walls
const tower = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 5, 1),
    new THREE.MeshStandardMaterial({
       
    })
)
tower.position.z = 1.7
tower.position.y = 5.2 / 2 // Raise to sit on the ground (centered on height)

chapel.add(tower)

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
//                           Lights
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
// ☰☰☰☰☰☰ Ambient light ☰☰☰☰☰☰
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)


// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
//                            Sizes
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    //☰☰☰☰☰☰ Update sizes ☰☰☰☰☰☰
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // ☰☰☰☰☰☰ Update camera ☰☰☰☰☰☰
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // ☰☰☰☰☰☰ Update renderer ☰☰☰☰☰☰
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
//                            Camera
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   

// ☰☰☰☰☰☰ Base camera ☰☰☰☰☰☰
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
const camera = new THREE.PerspectiveCamera(95, sizes.width / sizes.height, 0.1, 100)
// camera.position.set(4, 2, 5)
camera.position.set(4, 3, 8)
scene.add(camera)

// ☰☰☰☰☰☰ Controls ☰☰☰☰☰☰
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Focus the camera on the center of the house
// controls.target.set(0, 1, 2)
// controls.update()



// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
//                          Renderer 
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
//                           Animate    
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   
const timer = new Timer()

const tick = () =>
{
    // ☰☰☰☰☰☰  Timer ☰☰☰☰☰☰  
    timer.update()
    const elapsedTime = timer.getElapsed()

    // ☰☰☰☰☰☰ Update controls ☰☰☰☰☰☰
    controls.update()

    // ☰☰☰☰☰☰ Render ☰☰☰☰☰☰
    renderer.render(scene, camera)

    // ☰☰☰☰☰☰ Call tick again on the next frame ☰☰☰☰☰☰
    window.requestAnimationFrame(tick)
}

tick()



