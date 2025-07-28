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
//                            Chapel
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


// ☰☰☰☰☰☰ Traingle shape gap between roof panels ☰☰☰☰☰☰
const triangleGroup = new THREE.Group()

const triangleOutline = new THREE.Shape()
triangleOutline.moveTo(-2.1, 0)  // Bottom-left corner (x, y)
triangleOutline.lineTo(0, 2.1)  // Top peak 
triangleOutline.lineTo(2.1, 0)   // Bottom-right corner 

const fronttriangle = new THREE.Mesh(
    new THREE.ShapeGeometry(triangleOutline), // Passing the gableOutlile to the geometry
    new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide
    })
)
fronttriangle.position.set(0, 2.4, 2.76)

const backtriangle = fronttriangle.clone()
backtriangle.position.set(0, 2.4, -2.76)

triangleGroup.add(fronttriangle, backtriangle)
chapel.add(triangleGroup)



// ☰☰☰☰☰☰ Tower ☰☰☰☰☰☰
const towerGroup = new THREE.Group()

// Tower walls
const tower = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 5, 1),
    new THREE.MeshStandardMaterial({
       
    })
)
tower.position.z = 1.7
tower.position.y = 5.2 / 2 // Raise to sit on the ground (centered on height)


// Tower roof
const towerRoof = new THREE.Mesh(
  new THREE.ConeGeometry(1, 1, 4), // radius, height, 4 segments for pyramid
  new THREE.MeshStandardMaterial({ color: '#ff3333' })
)
towerRoof.rotation.y = Math.PI / 4 // Rotate so flat sides align with box walls
towerRoof.position.y = 5 + 1.2 / 2 // Tower height + half cone height
towerRoof.position.z = 1.7

towerGroup.add(tower, towerRoof) 
chapel.add(towerGroup)


// ☰☰☰☰☰☰ Cross ☰☰☰☰☰☰
const crossGroup = new THREE.Group()

const barGeometry = new THREE.BoxGeometry(0.05, 0.7, 0.05)
const barMaterial = new THREE.MeshStandardMaterial({})

// Vertical bar
const verticalBar = new THREE.Mesh(barGeometry, barMaterial)
verticalBar.position.y = 6.4
verticalBar.position.z = 1.7

// Horizontal bar
const horizontalBar = new THREE.Mesh(barGeometry, barMaterial)
horizontalBar.rotation.z = Math.PI / 2
horizontalBar.position.y = 6.5
horizontalBar.position.z = 1.7

crossGroup.add(verticalBar, horizontalBar)
chapel.add(crossGroup)


// ☰☰☰☰☰☰ Door ☰☰☰☰☰☰
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(1.3, 2.2),
    new THREE.MeshStandardMaterial({
        color: 'red'
    })
)
door.position.y = 1
door.position.z = 5.5 / 2 + 0.01 // walls depth / 2
chapel.add(door)



// ☰☰☰☰☰☰ Bushes ☰☰☰☰☰☰
const bushGeometry = new THREE.SphereGeometry(1, 16, 116)
const bushMaterial = new THREE.MeshStandardMaterial()

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 3.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 3.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 3.1)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 3.5)

chapel.add(bush1, bush2, bush3, bush4)



// ☰☰☰☰☰☰ Graves ☰☰☰☰☰☰
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
})

const gravesGroup = new THREE.Group()
scene.add(gravesGroup)

for (let i = 0; i < 30; i ++){

    // Cordinates:
    const angle = Math.random() * Math.PI * 2 // Placing graves randomly around a full circle. 

    // Math.random() * 5 -> gives a number between 0 and <5 + 4 gives us a number between 4 and 9
    const radius = 4 + Math.random() * 5
    const x = Math.sin(angle) * radius 
    const z = Math.cos(angle) * radius 

    // Mesh:
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.x = x
    grave.position.y = Math.random() * 0.4 // Gives random height to graves between between 0 and +0.4
    grave.position.z = z

    // Randomly tilt graves:
    grave.rotation.x = Math.random() - 0.5 // Changes the value between -0.5 to 0.5. 
    grave.rotation.y = Math.random() - 0.5
    grave.rotation.z = Math.random() - 0.5

    gravesGroup.add(grave)
}




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
camera.lookAt(0, 1, 0)
scene.add(camera)

// ☰☰☰☰☰☰ Controls ☰☰☰☰☰☰
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Focus the camera on the center of the house
// controls.target.set(0, 1, 2)
// controls.update()

// ☰☰☰☰☰☰ Camera helper ☰☰☰☰☰☰
const cameraHelper = new THREE.CameraHelper(camera);
scene.add(cameraHelper)

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



